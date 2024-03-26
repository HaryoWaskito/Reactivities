using Application.Core;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ListActivities
    {
        public class Query : IRequest<Result<List<UserActivityDto>>>
        {
            public string Predicate { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<UserActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<UserActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // List<UserActivityDto> result = new List<UserActivityDto>();

                // switch (request.Predicate.ToLower())
                // {
                //     case "past":
                //         result = await _context.ActivityAttendees
                //                         .Where(d => d.Activity.Date < DateTime.Now)
                //                         .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                //                         .ToListAsync();
                //         break;
                //     case "future":
                //         result = await _context.ActivityAttendees
                //                         .Where(d => d.Activity.Date > DateTime.Now)
                //                         .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                //                         .ToListAsync();
                //         break;
                //     case "hosting":
                //         result = await _context.ActivityAttendees
                //                         .Where(d => d.AppUser.UserName == _userAccessor.GetUsername() && d.IsHost)
                //                         .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                //                         .ToListAsync();
                //         break;
                // }

                var query = _context.ActivityAttendees
                    .Where(u => u.AppUser.UserName == request.Username)
                    .OrderBy(a => a.Activity.Date)
                    .ProjectTo<UserActivityDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();

                query = request.Predicate switch
                {
                    "past" => query.Where(a => a.Date <= DateTime.Now),
                    "hosting" => query.Where(a => a.HostUsername == request.Username),
                    _ => query.Where(a => a.Date >= DateTime.Now)
                };

                var activities = await query.ToListAsync();

                return Result<List<UserActivityDto>>.Success(activities);
            }
        }
    }
}
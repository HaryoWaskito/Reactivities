using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            // Logic to delete the activity from the data source goes here.
            var activity = await context.Activities.FindAsync([request.Id], cancellationToken)
            ?? throw new Exception("Cannot find activity");

            context.Remove(activity);
            await context.SaveChangesAsync(cancellationToken);

            // Assuming deletion is successful, return Unit.Value
            // return Unit.Value;
        }

    }
}
import graphene
from graphene_django import DjangoObjectType
from .models import Goals

class GoalsType(DjangoObjectType):
    class Meta:
        model = Goals
        fields = ("id", "goal", "completed", "do_not_use")

class Query(graphene.ObjectType):
    goals = graphene.List(GoalsType)

    def resolve_goals(root, info):
        # We can easily optimize query count in the resolve method
        return Goals.objects.all()

class GoalsMutation(graphene.Mutation):
    class Arguments:
        # The input arguments for this mutation
        new_goal = graphene.String(required=True)
        
    # The class attributes define the response of the mutation
    goal = graphene.Field(GoalsType)

    @classmethod
    def mutate(cls, self, info, new_goal):
        goal = Goals(goal=new_goal)
        goal.save()
        # Notice we return an instance of this mutation
        return GoalsMutation(goal=goal)

class DeleteGoal(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
       
    msg = graphene.String()
   
    @classmethod
    def mutate(cls, self, info, id):
        goal_to_delete = Goals.objects.get(id=id).delete()
        return DeleteGoal(msg = "Post deleted Successfully")

class UpdateGoal(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        goal = graphene.String(required=True)
 
    updated_goal = graphene.Field(GoalsType)
   
    @classmethod
    def mutate(cls, self, info, id, goal):
        record = Goals.objects.get(id=id)
        record.goal = goal
        record.save()
        return UpdateGoal(updated_goal=record)

class Mutation(graphene.ObjectType):

    #post
    create_new_goal = GoalsMutation.Field()

    #update(put)
    update_goal = UpdateGoal.Field()

    #delete
    delete_goal = DeleteGoal.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)


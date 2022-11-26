from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Goals
from .serializers import GoalsSerializer


# Create your views here.
@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def manage_goals(request):

    if request.method == 'GET':
        goals= Goals.objects.all()
        serializer= GoalsSerializer(goals, many=True)

        return Response(serializer.data)

       
    elif request.method == 'POST':
        data = request.data
        goal= data['goal']
        new_goal = Goals.objects.create(
            goal=goal,
        )
        new_goal.save()
        return Response('New goal added to the database')


    elif request.method == 'PUT':

        data = request.data
        goal_id= data['goal_id']
        goal_completed= data['goal_completed']
        goal_from_db= Goals.objects.get(id=goal_id)
        goal_from_db.completed= goal_completed

        goal_from_db.save()
        return Response(f'Completed value changed!, {goal_completed}, {goal_from_db.completed}')

    
    elif request.method == 'DELETE':
        
        data = request.data
        goal_id= data['goal_id']
        goal_from_db = Goals.objects.get(id=goal_id)
        goal_from_db.delete()
         
        return Response('Goal Deleted')



@api_view(['PUT'])
def edit_goal(request):

    data = request.data
    goal_id= data['goal_id']
    new_value= data['edit_goal']
    goal_from_db= Goals.objects.get(id=goal_id)
    goal_from_db.goal= new_value

    goal_from_db.save()
    return Response(f'Goal text changed!')


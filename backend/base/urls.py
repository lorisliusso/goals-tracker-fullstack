from django.urls import path
from . import views


urlpatterns = [
    path('goals/manage-goals/', views.manage_goals, name="manage-goals"),
    path('goals/edit-goal/', views.edit_goal, name="edit-goal"),
    
]
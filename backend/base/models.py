from django.db import models

# Create your models here.

class Goals(models.Model):
    goal= models.TextField(null=True, blank= True)
    completed= models.BooleanField(default=False)
    
    def __str__(self):
        return self.goal
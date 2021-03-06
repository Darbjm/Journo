# pylint: disable=no-member
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class Trip(models.Model):
    country = models.CharField(max_length=150)
    local_area = models.CharField(max_length=80)
    postcode = models.CharField(max_length=80)
    description = models.TextField(max_length=600)
    image = models.CharField(max_length=200)
    rating = models.PositiveSmallIntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    cost = models.PositiveIntegerField()
    start_date = models.DateField()
    end_date = models.DateField()
    Length = models.CharField(max_length=100)
    user = models.ForeignKey(User, related_name='trips', on_delete=models.CASCADE)
    

    def __str__(self):  
        return f'{self.country} from {self.start_date} - {self.end_date}'

class Comment(models.Model):
  text = models.CharField(max_length=300) 
  trip = models.ForeignKey(Trip, related_name='comments', null=True, on_delete=models.CASCADE)
  owner = models.ForeignKey(User, related_name='comments', null=True, on_delete=models.CASCADE)
  
  def __str__(self):
    return f'Comment {self.id} on {self.trip}'
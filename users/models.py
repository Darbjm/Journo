# pylint: disable=no-member
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.CharField(max_length=50)
    image = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.id} - {self.username} - {self.email}'


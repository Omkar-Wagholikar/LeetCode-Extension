# views.py
from django.shortcuts import render
from django.http import JsonResponse

def index(request):
    return render(request, 'index.html')


def check(request):
    return JsonResponse({"Dis":"True"})

#  /home/omkar/Desktop/channel_test/venv/bin/daphne channel_test.asgi:application
# c && /home/omkar/Desktop/channel_test/venv/bin/daphne channel_test.asgi:application
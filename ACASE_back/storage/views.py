from django.shortcuts import render
from django.http import HttpResponse
from storage.models import Item, Keyword, Target
from django.views.decorators.csrf import csrf_exempt
import pdb
import json


def retrieve_items(request):
    obj = list(Item.objects.all())
    return HttpResponse(
        json.dumps([{'id':attr.id,
                     'title':attr.title,
                     'url':attr.url,
                     'date':attr.date,
                     'source_url': attr.source_url,
                     'Associated_KW': attr.Associated_KW,
                     'text':attr.text,
                     'relevance':attr.relevance,
                     'learning':attr.learning,
                     'finding':attr.finding,
                     'page':attr.pages} for attr in list(obj)]))


def keywords(request):
    obj = list(Keyword.objects.all())
    return HttpResponse(
        json.dumps([{'word':attr.word} for attr in list(obj)]))


def target(request):
    obj = list(Target.objects.all())
    return HttpResponse(
        json.dumps([{'name':attr.name,
                     'base_url':attr.base_url} for attr in list(obj)]))

@csrf_exempt
def update(request):
    if request.method == 'POST':
        data = {}
        data['id'] = (json-loads(request.POST['relevance']))
        data['relevance'] = (json.loads(request.POST['relevance']))
        data['learning'] = (json.loads(request.POST['learning']))
        data['finding'] = (json.loads(request.POST['finding']))
        data['pages'] = (json.loads(request.POST['pages']))
        for item in data:
            for key, value in item.items():
                if key == 'id':
                    id_num = value
            obj = Item.objects.filter(id=id_num).update(**item)
        return HttpResponce('melo caramelo')
    return HttpResponce('todo mal')

import json
from rest_framework.views import APIView
from Adminlogin.models import *
from utils.responseUtils import *


class Login(APIView):
    def post(self, request):
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = CustomUser.objects.filter(username=username, password=password)
        if user is not None:
            data = {'success': True}
            return responseJson('登陆成功', '200', data)
        else:
            data = {'success': False}
            return responseJson('用户名或密码错误', '403', data)

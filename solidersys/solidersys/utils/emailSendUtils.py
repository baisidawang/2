from random import Random
from users.models import EmailVerifyRecord
from django.core.mail import send_mail
from edusys.settings import EMAIL_FROM

def random_str(randomlength=8):
	str=''
	chars='AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
	lenght=len(chars)-1
	random=Random()
	for i in range(randomlength):
		str+=chars[random.randint(0, lenght)]
	return str

def send_register_email(email):
	email_record=EmailVerifyRecord()
	code=random_str(16)
	email_record.code=code
	email_record.email=email
	email_record.save()
	email_title='**网注册激活链接'
	email_body=='请单击下面的链接激活你的帐号：http://127.0.0.1:8000/active/{0}'.format(code)
	send_mail(email_title, email_body, EMAIL_FROM, [email])


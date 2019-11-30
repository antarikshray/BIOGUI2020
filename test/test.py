import socket
import random
import time 
# import tkinter as tk
# port=3301
#ADDRESS= '192.168.43.36'    

port=23912
# ADDRESS='192.168.1.19'          
ADDRESS='127.0.0.1'          
s = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
print("123")
a=0
b=0
c=0
d=0
e=0
#i=",20,21,22,23,24,25,26,"
#k=0
#s.bind((ADDRESS,port))
while True:
	st=","+str(a)+","+str(b)+","+str(c)+","+str(d)+","+str(e)+","+str(a+5)+","+str(a+6)+","
#	data, addr = s.recvfrom(1024)
#	sata=data.decode('utf-8')
#	print(sata)
	#by=bytearray('w')
	#k=by.encode("hex")
	f=st.encode('utf-8')
	s.sendto(f,(ADDRESS,port))
	print("ok")
	b=random.uniform(0,3)
	a=random.randint(1,600)
	c=random.uniform(0,1)
	d=random.uniform(0,1)
	e=random.randint(7,13)
	time.sleep(.5)




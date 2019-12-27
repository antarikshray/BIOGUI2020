import sys
import tkinter as tk
    

defaultIp = "192.168.1.31"    
updateReturnVal = "0000"



def callGUI(ipfromshell):
    def startThis():
        a = vara.get()
        sys.stdout.write(str(a))
        exit(0)

    def startDefault():
        myip = n1
        sys.stdout.write(str(defaultIp))
        exit(0)

    def updateTheGUI():
        sys.stdout.write(str(updateReturnVal))
        exit(0)

    myip = ipfromshell
    root = tk.Tk()
    root.title("PRE GUI")

    Yourip = tk.Label(root, text="YOUR IP IS : ").grid(row = 0,column = 0)
    yourip = tk.Label(root, text=myip).grid(row = 0,column = 1)

    Roverip1 = tk.Label(root, text="[UBIQUITY] ROVER's IP : ").grid(row = 2,column = 0)
    roverip1 = tk.Label(root, text=defaultIp).grid(row = 2,column = 1)
    sendip1 = tk.Button(root, 
                    text="START WIH DEFAULT IP", 
                    fg="green",
                    command=startDefault).grid(row = 2,column = 2)



    Roverip2 = tk.Label(root, text="[PERSONAL] ROVER's IP : ").grid(row = 3,column = 0)

    vara=tk.StringVar()
    roverip2 = tk.Entry(root, textvariable = vara).grid(row = 3,column = 1)
    sendip2 = tk.Button(root, 
                    text="    START WIH THIS IP    ", 
                    fg="blue",
                    command=startThis).grid(row = 3,column = 2)

    update = tk.Button(root, 
                    text="UPDATE THE GUI ", 
                    fg="red",
                    command=updateTheGUI).grid(row = 4,column = 0 )

    quitButton = tk.Button(root, 
                    text="QUIT", 
                    fg="red",
                    command=quit).grid(row = 4,column = 1)


    root.mainloop()

if __name__ == "__main__":
    n1=str(sys.argv[1])
    callGUI(n1)
    #print("AFTER CALL")
    #sys.stdout.write(str(defaultIp))
  
    


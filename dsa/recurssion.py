def printNormal(list,sI):
    if(sI>=len(list)):
        return
    print(list[sI])
    printNormal(list,sI+1)

printNormal([3,4,5],0)
def printRev(list,sI):
    if(sI>=len(list)):
        return 
    printRev(list,sI+1)
    print(list[sI])



printRev([4,5,6],0)
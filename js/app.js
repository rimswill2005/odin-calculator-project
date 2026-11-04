


const Calculator = {



    add : (n1,n2) => {
        return  n1 + n2
    },
    subtract : (n1,n2) => {

        return n1 - n2;
    },
    multiply : (n1,n2) => {
        return n1 * n2;
    },

    divide : (n1,n2) => {
        return n1 / n2;
    },

    operator : (operant,n1,n2) => {
        
        if(operant === '+') 
            return n1 + n2
        else if(operant === '-')
            return n1 - n2
        else if(operant === '*')
            return n1 * n2
        else if(operant === '/')
            return n1 * n2;
        else 
            return "incorrect operator"
    }

    
}


console.log(Calculator.operator('+',20,30))



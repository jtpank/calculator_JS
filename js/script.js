class Calculator {
	constructor(previousOpText, currentOpText) {
		this.previousOpText = previousOpText;
		this.currentOpText = currentOpText;
		this.clearAll();
	}

	clearAll()
	{
		this.currentOp = '';
		this.previousOp = '';
		this.operation = undefined;
	}

	deleteNumber()
	{
		this.currentOp = this.currentOp.toString().slice(0,-1);
	}

	numberButton(number)
	{
		if(number === '.' && this.currentOp.includes('.')) return;
		this.currentOp = this.currentOp.toString()+number.toString();
		//console.log("currentoptext: " + this.currentOpText);
	}

	operateButton(operation)
	{
		if(this.currentOp === '') return;
		if(this.previousOp !== '')
		{
			this.calculateButton();
		}
		this.operation = operation;
		this.previousOp = this.currentOp;
		this.currentOp = '';
	}

	calculateButton()
	{
		let total;
		const prevNum = parseFloat(this.previousOp);
		const currNum = parseFloat(this.currentOp);
		if(isNaN(prevNum) || isNaN(currNum)) return;
		if(this.operation === '*')
		{ total = prevNum*currNum;}
		else if(this.operation === '+')
		{ total = prevNum+currNum;}
		else if(this.operation === '/')
		{ total = prevNum/currNum;}
		else if(this.operation === '-')
		{ total = prevNum-currNum; }
		this.previousOp = '';
		this.currentOp = total;
		this.operation = undefined;
		
		
	}

	updateDisplay()
	{
		this.currentOpText.innerText = this.currentOp;
		if(this.operation!=null)
		{
			this.previousOpText.innerText = this.previousOp.toString() + this.operation.toString();
		}
		else
		{
			this.previousOpText.innerText='';
		}
		
		//console.log("currentOp: " + this.currentOp);
	}

}

const numData = document.querySelectorAll('[num-data]');
const opData = document.querySelectorAll('[op-data]');
const opDel = document.querySelector('[op-del]');
const opClearAll = document.querySelector('[op-clear-all]');
const opCalculate = document.querySelector('[op-calculate]');
const previousOpText = document.querySelector('[previous-op]');
const currentOpText = document.querySelector('[current-op]');


const calc = new Calculator(previousOpText, currentOpText);

opClearAll.addEventListener('click', () => 
{
	calc.clearAll();
	calc.updateDisplay();
})

opDel.addEventListener('click', () =>
{
	calc.deleteNumber();
	calc.updateDisplay();
})

numData.forEach(button => 
{
	button.addEventListener('click',() => 
	{
		calc.numberButton(button.innerText);
		calc.updateDisplay();
	})
})

opData.forEach(button => 
{
	button.addEventListener('click',() => 
	{
		calc.operateButton(button.innerText);
		calc.updateDisplay();
	})
})

opCalculate.addEventListener('click', () => 
{
	calc.calculateButton();
	calc.updateDisplay();
})

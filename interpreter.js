var VirtualMachine = function() {
	var memory = new ArrayBuffer(30000);
	var instructions = [];
	var instruction_pointer = 0;
	var data_pointer = 0;
	var output =  "";
	this.initialize_machine = function(){
		for (var i;i<memory.length;i++) memory[i] = 0;
		instruction_pointer = 0;
		data_pointer = 0;
	}
	this.load_program = function(source_code) {
		instructions = source_code;
		this.initialize_machine();
	}
	this.run = function(){
		while(instruction_pointer<instructions.length){
			switch(instructions[instruction_pointer]) {
				case '>':
					data_pointer = data_pointer + 1;
					break;
				case '<':
					data_pointer = data_pointer - 1;
					break;
				case '+':
					memory[data_pointer] = memory[data_pointer] + 1;
					break;
				case '-':
					memory[data_pointer] = memory[data_pointer] - 1;
					break;
				case '.':
					output = output + memory[data_pointer];
					break;
				case ',':
					//accept one byte of input, storing its value in the byte at the data pointer.
					//PFM: I haven`t think yet on how to implement this! (UI sense and usability)
					break;
				case '[':
					//if the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command.
					break;
				case ']':
					//if the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching [ command.
					break;
			}
			instruction_pointer = instruction_pointer + 1;
		}
	}
	this.get_output = function() {
		return output;
	}
};

var process_input = function(source_code) {
	var machine = new VirtualMachine();
	machine.load_program(source_code);
	machine.run();
	return machine.get_output();
}

var process_file = function(){
	var input_source = document.getElementById("input").value;
	var output = process_input(input_source);
	document.getElementById("output").innerHTML = output;
}
var VirtualMachine = {
	memory: new ArrayBuffer(30000),
	instructions: [],
	instruction_pointer: 0,
	data_pointer: 0,
	output: "",
	initialize_machine: function(){
		for (var i;i<this.memory.length;i++) memory[i] = 0;
		instruction_pointer = 0;
		data_pointer = 0;
	},
	load_program: function(source_code) {
		instructions = source_code;
		this.initialize_machine();
	},
	run: function(){
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
	},
	get_output: function() {
		return output;
	}
};

var process_input = function(source_code) {
	var machine = new VirtualMachine();
	machine.load_program();
	machine.run();
	return machine.get_output();
}

var process_file = function(){
	alert((document.getElementById("input").value)[0]);
	var input_source = document.getElementById("input").value;
	var output = process_input(input_source);
	document.getElementById("output").innerHTML = output;
}
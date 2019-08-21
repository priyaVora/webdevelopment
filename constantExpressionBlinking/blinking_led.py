def compiler(): 
    integer_hex = convertToHex(read_blink_number())
    instructions_list = [
        'MOVW R13 0',
        'MOVT R13 0', 
        'MOVW R6 ' + integer_hex[1],
        'MOVT R6 ' + integer_hex[0],
        'STR R6 R13', 
        'LDR R6 R13'
        ]
    filename = 'combinedpseudo.txt'
    file = open(filename, 'wb+')
    for instruction in reversed(instructions_list): 
        line_prepender(filename, instruction);    
    return {
        "instructions": instructions_list, 
        "MOVW_Integer": integer_hex[1], 
        "MOVT_Integer": integer_hex[0]
    }

def conduct(instruction_mapping):
    cmds = {'ADD': '00101000', 'SUB': '00100101', 'OR': '00111000', #001, 1
          'STR': '01011000', 'LDR': '01011001',
          'MOVW': '00110000', 'MOVT': '00110100',
          'B': '1010'}
    cond = {'AL': '1110', 'NE': '0001', 'PL': '0101'}

    instructions_list = []
    combined_instructions = []
    
    filename = 'combinedpseudo.txt'
    compiler = read_parser(filename)
    for x in compiler: 
        combined_instructions.append(x); 
    for x in instruction_mapping: 
        combined_instructions.append(x);  
    print(combined_instructions)
    
    for x in combined_instructions: 
        if x[0] in ['MOVW', 'MOVT']:
            register_number = '{:04b}'.format(int(x[1].replace('R',''))) 
            immbin = str(bin(int(x[2], 16)))[2:] 
            immediate_value = f'{"0"*(16-len(immbin))}{immbin}'
            pattern = f"1110{cmds[x[0]][:4]}{cmds[x[0]][4:]}{immediate_value[0:4]}{register_number}{immediate_value[4:8]}{immediate_value[8:12]}{immediate_value[12:16]}"            
        elif x[0] == 'ADD':
            source_register = '{:04b}'.format(int(x[2].replace('R','')))
            destination_register = '{:04b}'.format(int(x[1].replace('R','')))
            immbin = str(bin(int(x[3], 16)))[2:]
            immediate_value = f'{"0"*(12-len(immbin))}{immbin}'
            pattern = f"1110{cmds[x[0]][:4]}{cmds[x[0]][4:]}{source_register}{destination_register}{immediate_value}"
        elif x[0] == 'LDR':
            source_register = '{:04b}'.format(int(x[2].replace('R','')))
            destination_register = '{:04b}'.format(int(x[1].replace('R','')))
            immbin = str(bin(int("0", 16)))[2:]
            immediate_value = f'{"0"*(12-len(immbin))}{immbin}'
            pattern = f"1110{cmds[x[0]][:4]}{cmds[x[0]][4:]}{source_register}{destination_register}{immediate_value}"
        elif x[0] == 'OR':
            source_register = '{:04b}'.format(int(x[2].replace('R','')))
            destination_register = '{:04b}'.format(int(x[1].replace('R','')))
            immbin = str(bin(int(x[3], 16)))[2:]
            immediate_value = f'{"0"*(12-len(immbin))}{immbin}'
            pattern = f"1110{cmds[x[0]][:4]}{cmds[x[0]][4:]}{source_register}{destination_register}{immediate_value}"
        elif x[0] == 'STR':
            source_register = '{:04b}'.format(int(x[2].replace('R','')))
            destination_register = '{:04b}'.format(int(x[1].replace('R','')))
            immbin = str(bin(int("0", 16)))[2:]
            immediate_value = f'{"0"*(12-len(immbin))}{immbin}'
            pattern = f"1110{cmds[x[0]][:4]}{cmds[x[0]][4:]}{source_register}{destination_register}{immediate_value}"
        elif x[0] ==  'SUB':
            source_register = '{:04b}'.format(int(x[2].replace('R','')))
            destination_register = '{:04b}'.format(int(x[1].replace('R','')))
            immbin = str(bin(int(x[3], 16)))[2:]
            immediate_value = f'{"0"*(12-len(immbin))}{immbin}'
            pattern = f"1110{cmds[x[0]][:4]}{cmds[x[0]][4:]}{source_register}{destination_register}{immediate_value}"
        elif x[0] == 'BNE':
            immbin = str(bin(int(x[1], 16)))[2:]
            immediate_value = f'{"0"*(4-len(immbin))}{immbin}'
            pattern = '00011010' + immediate_value
        elif x[0] == 'B': 
            immbin = str(bin(int(x[1], 16)))[2:]
            immediate_value = f'{"0"*(4-len(immbin))}{immbin}'
            pattern = '11101010' + immediate_value
        instructions_list.append(pattern)
    save_to_kernel(instructions_list)

def line_prepender(filename, line):
    with open(filename, 'r+') as f:
        content = f.read()
        f.seek(0, 0)
        f.write(line.rstrip('\r\n') + '\n' + content)

    
def convertToBinary(n):
    # print(n % 2,end = '')
   if n > 1:
       convertToBinary(n//2)

def save_to_kernel(arrayoflines): 
    strbytes = ''
    for x in arrayoflines:
        bytelis = [x[a:a+8] for a in range(0, len(x), 8)] #splits the line into 8 bit section
        bytelis = [chr(int(a, 2)) for a in reversed(bytelis)] # turns each of those 8 bit things into char
        print(bytelis)
        strbytes += ''.join(bytelis) #combines all those characters to one line
    print(strbytes)
    file = open('kernel7.img', 'wb+') #write in byte form
    file.write(strbytes.encode('iso-8859-15')) #once it writes it above -> encoding turns into the format we want for the kernel file

def read_parser(filepath):
    with open(filepath) as fp:
        line = fp.readline()
        cnt = 0
        instructions = []
        while line:
            instructions.append(line.strip().split())
            line = fp.readline()
            cnt += 1
    return instructions

def read_blink_number():
    filepath = 'blinknumber.txt'
    with open(filepath) as fp:
        line = fp.readline()    
    return int(line)

def convertToHex(n):
    hx = str(hex(n))[2:]
    hx = '0'*(8-len(hx)) + hx
    return ['0x'+hx[:4], '0x'+hx[4:]]
# line_prepender('combinedpseudo.txt', 'hello')
compiler()
conduct(read_parser('pseudo.txt'))
# compiler()
# print(compiler()['MOVW_Integer'])


# read_parser()
 
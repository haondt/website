import yaml, json

INPUT_FILE = 'config/deploy.env.yml'
NESTING_SEPERATOR = '__'

def load_file():
    with open(INPUT_FILE, 'r') as f:
        return yaml.safe_load(f.read())

def flatten(prefix, data) -> dict[str, str|int|float|bool]:
    if isinstance(data, (str, int, float, bool)):
        return { prefix: data }
    if len(prefix) > 0:
        prefix = f'{prefix}{NESTING_SEPERATOR}'
    if isinstance(data, list):
        items = [flatten(f'{prefix}{i}', v) for i, v in enumerate(data)]
        return { k: v for fl in items for k, v in fl.items() }
    if isinstance(data, dict):
        items = [flatten(f'{prefix}{k}', v) for k, v in data.items()]
        return { k: v for fl in items for k, v in fl.items() }

def create_env_file(data):
    l = []
    for k,v in data.items():
        if isinstance(v, str):
            v = json.dumps(v)
        elif isinstance(v, bool):
            v = str(v).lower()
        elif (
            isinstance(v, int) or \
            isinstance(v, float)):
            v = str(v)
        else:
            raise Exception(f'Cannot convert value for key \'{k}\'')
        l.append(f'{k}={v}')
    return '\n'.join(l) + '\n'

def main():
    data = load_file()
    data = flatten('', data)
    text = create_env_file(data)
    print(text, end='')

if __name__ == '__main__':
    main()
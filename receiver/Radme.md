## Create Environment

- Install *virtualenv*

```bash
[sudo] pip install virtualenv
 ```

- Create an environment

```bash
virtualenv -p python3 venv
```

- Activate script

```bash
source venv/bin/activate
```

- Install dependencies

```bash
pip install -r receiver/requirements.txt
```

- Deactivate script

```bash
deactivate
```
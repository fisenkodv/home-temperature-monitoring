# Set up systemd to monitor Web Application application

To configure systemd follow the following steps:

- copy `monitoring.service` to `/etc/systemd/system/`
- enable the service `sudo systemctl enable monitoring.service`
- start the service `sudo systemctl start monitoring.service`
- check the service's status `sudo systemctl status monitoring.service`
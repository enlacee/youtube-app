import os
import sys

sys.path.append('/var/www/html/acopitan/yo/app-youtube/app')

# Activate your virtual env
activate_env=os.path.expanduser("/var/www/html/acopitan/yo/app-youtube/ENV/bin/activate_this.py")
execfile(activate_env, dict(__file__=activate_env))

from index import app as application

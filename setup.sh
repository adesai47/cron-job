echo "#!/bin/bash" > setup.sh
echo "curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -" >> setup.sh
echo "sudo yum install -y nodejs" >> setup.sh
echo "curl -fsSL https://bun.sh/install | bash" >> setup.sh
chmod +x setup.sh


# 用户问题
how can i ssh into wsl
# ChatGPT
To SSH **into** WSL (from Windows into the WSL instance):


### 1. **Enable SSH in WSL**


```bash
sudo apt update
sudo apt install openssh-server
sudo service ssh start
```


Optional: `sudo systemctl enable ssh` if using a systemd-enabled distro.


### 2. **Find WSL IP**


```bash
hostname -I
```


Alternatively, from PowerShell:


```powershell
wsl hostname -I
```


### 3. **Set WSL user password**


```bash
sudo passwd $USER
```


### 4. **SSH from Windows**


Open PowerShell or Command Prompt:


```powershell
ssh @
```


### Optional: Setup static IP or DNS name


WSL IP changes on restart. To avoid that:


- Use `wsl.local` via mDNS (if supported):
`ssh &lt;user&gt;@wsl.local`
- Or use `localhost` with port forwarding.

### Port Forwarding Trick (Persistent SSH via localhost):


In PowerShell:


```powershell
netsh interface portproxy add v4tov4 listenport=2222 listenaddress=127.0.0.1 connectport=22 connectaddress=
```


Then:


```powershell
ssh @localhost -p 2222
```


Let me know if you're trying to go the *other* way (SSH *from* WSL).
# 用户问题
ssh into wsl from termux
# ChatGPT
To SSH into WSL from **Termux** on Android, here's the plan:



### **1. Start SSH server inside WSL**


In WSL:


```bash
sudo apt update
sudo apt install openssh-server
sudo service ssh start
```



### **2. Set WSL user password**


```bash
sudo passwd $USER
```



### **3. Get WSL IP address**


In WSL:


```bash
hostname -I
```


Let’s say the IP is `172.22.99.44`.



WSL IP is typically on a virtual network and **not visible to Android**.




### **4. Expose WSL to Android (bridge the network)**


You **can’t reach WSL directly** from Android unless you:


#### **Option A: Port-forward through Windows**


On your Windows host (PowerShell as Admin):


```powershell
netsh interface portproxy add v4tov4 listenport=2222 listenaddress=0.0.0.0 connectport=22 connectaddress=
```


Also allow traffic through the firewall:


```powershell
New-NetFirewallRule -DisplayName "WSL SSH" -Direction Inbound -LocalPort 2222 -Protocol TCP -Action Allow
```



### **5. SSH from Termux**


Install OpenSSH in Termux (if not already):


```bash
pkg install openssh
```


Then connect:


```bash
ssh @ -p 2222
```


Find your Windows host IP (e.g., via `ipconfig` or your router).



**Note**: WSL2 uses a NAT’d network. No direct access from LAN without portproxy tricks.


Want a persistent setup or script? I can help with that too.
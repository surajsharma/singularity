```sh
docker stop $(docker ps -a -q)
docker rm $(docker ps -qa)
docker pull zadam/trilium:latest
docker run -d -p 0.0.0.0:8080:8080 -v ~/trilium-data:/home/node/trilium-data zadam/trilium:latest
docker ps
```

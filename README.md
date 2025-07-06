# Deploy Frontend - EventHub

## 1. Build dell'immagine Docker

Costruire l'immagine Docker localmente:

```bash
    docker build -t eventhub/frontend:latest .

    minikube image load eventhub/frontend:latest
```

## 2. Deploy dell'immagine Docker

```bash
    cd k8s
    kubectl apply -f .
```

## 3. Avvio frontend

```bash
    kubectl port-forward nome-pod-frontend 5173:80 -n eventhub
```

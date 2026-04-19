import WebSocket from 'ws';
export class DfxServer {
    async connect(config) {
        const res = await fetch('http://localhost:3001/connect', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ key: 'aabc' })
        });
        const response = await res.json();
        const wsUrl = response.wsUrl;
        if (!wsUrl) {
            console.log("Erro ao conectar a API: ", response.message);
            return;
        }
        console.log(response.message);
        const ws = new WebSocket(wsUrl);
        ws.on('open', () => {
            console.log("Upgraded: http > ws");
            console.log("Conectado ao servidor!");
        });
    }
}

{
    "version": 2
    "builds": [
        {
            "src": "server/index.js",
            "use": "@vercel/node"
        }
    ]
    "routes": [
        {
            "src": "/(.*)",
            "dest": "server/index.js"
        }
    ]
}
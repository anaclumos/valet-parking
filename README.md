# bellboy

> A GitHub App built with [Probot](https://github.com/probot/probot) that A nice welcoming bot that does the housekeeping for your repository

## Setup

```sh
# Install dependencies
npm install

# Run the bot
npm start
```

## Docker

```sh
# 1. Build container
docker build -t bellboy .

# 2. Start container
docker run -e APP_ID=<app-id> -e PRIVATE_KEY=<pem-value> bellboy
```

## Contributing

If you have suggestions for how bellboy could be improved, or want to report a bug, open an issue! We'd love all and any contributions.

For more, check out the [Contributing Guide](CONTRIBUTING.md).

## License

[ISC](LICENSE) © 2025 Sunghyun Cho

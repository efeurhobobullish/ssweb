# ssweb

## Overview

ssweb is a modern, carefully crafted server application built with Express.js and Playwright. It provides functionality to capture screenshots and record videos of websites programmatically. This project is ideal for backend developers looking to automate website visual testing, content capture, or monitoring tasks.

## Features

- Capture screenshots of any website URL.
- Record videos of website interactions.
- Easy-to-use server interface built on Express.js.
- Utilizes Playwright for reliable and fast browser automation.
- Supports scalable and automated website capturing workflows.

## Tech Stack

- **JavaScript** (Node.js)
- **Express.js** - Web framework for server-side API.
- **Playwright** - Browser automation for screenshots and video recording.
- **Docker** - Containerization support (Dockerfile included).
- Other utilities: `fs`, `path`

## Getting Started

### Prerequisites

- Node.js (version 14 or higher recommended)
- npm or yarn
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository

```bash
git clone https://github.com/efeurhobobullish/ssweb.git
cd ssweb
```

2. Install dependencies

```bash
npm install
```

3. Start the server

```bash
npm start
```

The server will start listening for requests on the configured port (default 3000).

## Usage

Once the server is running, you can interact with its API to capture screenshots and videos.

### Example: Capture a Screenshot

Send a POST request to the server (e.g., `http://localhost:3000/screenshot`) with a JSON body specifying the URL to capture:

```bash
curl -X POST http://localhost:3000/screenshot \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}' --output example.png
```

This will save a screenshot of `https://example.com` as `example.png`.

### Example: Record a Video

Similarly, use the video recording endpoint (e.g., `http://localhost:3000/record`) with the URL and duration parameters:

```bash
curl -X POST http://localhost:3000/record \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","duration":10000}' --output example.mp4
```

This records a 10-second video of the website session.

## Contributing

Contributions are welcome! Please follow these steps:

- Fork the repository
- Create your feature branch (`git checkout -b feature/my-feature`)
- Commit your changes (`git commit -m 'Add some feature'`)
- Push to the branch (`git push origin feature/my-feature`)
- Open a Pull Request

Please ensure your code adheres to the existing style and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
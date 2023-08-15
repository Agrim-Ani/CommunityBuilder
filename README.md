# CommunityBuilder

```markdown
# Community Management Backend

This is a Node.js backend project that implements the functionality of managing communities and users as per the given requirements.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Role](#role)
  - [User](#user)
  - [Community](#community)
  - [Member](#member)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

- Node.js v14+
- MongoDB
- @theinternetfolks/snowflake library

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/community-management-backend.git
```

2. Navigate to the project directory:

```bash
cd community-management-backend
```

3. Install dependencies:

```bash
npm install <see package.json>
```

4. Create a `.env` file in the project root and set your environment variables:

```plaintext
PORT=3000
MONGODB_URI=mongodb://localhost:27017/communitydb
SECRET_KEY=your-secret-key
```

Replace `your-secret-key` with your actual secret key for JWT authentication.

5. Run the server:

```bash
npm run start
```

The server will be running at `http://localhost:3000`.

## API Endpoints

### Role

- **Create Role**
  - Method: POST
  - URL: `/v1/role`
  - Body: `{"name": "Community Admin"}`

- **Get All Roles**
  - Method: GET
  - URL: `/v1/role`

### User

- **Sign Up**
  - Method: POST
  - URL: `/v1/auth/signup`
  - Body: `{"name": "User Name", "email": "user@example.com", "password": "strongpassword"}`

- **Sign In**
  - Method: POST
  - URL: `/v1/auth/signin`
  - Body: `{"email": "user@example.com", "password": "strongpassword"}`

- **Get My Details**
  - Method: GET
  - URL: `/v1/auth/me`
  - Authorization Header: `Bearer <access_token>`

### Community

- **Create Community**
  - Method: POST
  - URL: `/v1/community`
  - Body: `{"name": "Community Name"}`

- **Get All Communities**
  - Method: GET
  - URL: `/v1/community`

- **Get All Members of Community**
  - Method: GET
  - URL: `/v1/community/:id/members`
  - Authorization Header: `Bearer <access_token>`

- **Get My Owned Communities**
  - Method: GET
  - URL: `/v1/community/me/owner`
  - Authorization Header: `Bearer <access_token>`

- **Get My Joined Communities**
  - Method: GET
  - URL: `/v1/community/me/member`
  - Authorization Header: `Bearer <access_token>`

### Member

- **Add Member**
  - Method: POST
  - URL: `/v1/member`
  - Body: `{"community": "<community_id>", "user": "<user_id>", "role": "<role_id>"}`

- **Remove Member**
  - Method: DELETE
  - URL: `/v1/member/:id`
  - Authorization Header: `Bearer <access_token>`

## Usage

You can use Postman or any other API testing tool to interact with the API endpoints and test the functionalities of this backend project.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

Replace placeholders like `your-username`, `your-secret-key`, and add appropriate explanations to customize the README according to your project structure and needs.

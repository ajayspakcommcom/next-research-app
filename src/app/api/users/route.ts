import { NextResponse } from 'next/server';

let users = [
  { id: 1, name: 'Ajay' },
  { id: 2, name: 'John' }
];

// GET /api/users
export async function GET() {
  return NextResponse.json(users);
}

// POST /api/users
export async function POST(req: Request) {
  const body = await req.json();
  const newUser = {
    id: Date.now(),
    name: body.name,
  };
  users.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}

// PUT /api/users
export async function PUT(req: Request) {
  const body = await req.json();
  const index = users.findIndex((u) => u.id === body.id);
  if (index === -1) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
  users[index].name = body.name;
  return NextResponse.json(users[index]);
}

// DELETE /api/users
export async function DELETE(req: Request) {
  const body = await req.json();
  users = users.filter((u) => u.id !== body.id);
  return NextResponse.json({ message: 'User deleted' });
}

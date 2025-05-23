import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const directory = searchParams.get('directory');

  if (!directory) {
    return NextResponse.json({ error: 'Directory parameter is required' }, { status: 400 });
  }

  try {
    const publicPath = path.join(process.cwd(), 'public');
    const fullPath = path.join(publicPath, directory);

    // Check if directory exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Directory not found' }, { status: 404 });
    }

    // Read directory contents
    const files = fs.readdirSync(fullPath);

    // Filter for image files and create full paths
    const imageFiles = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
      })
      .map(file => {
        // Convert Windows path to URL-friendly path
        const relativePath = path.join(directory, file);
        return relativePath.replace(/\\/g, '/');
      })
      .sort(); // Sort files alphabetically

    return NextResponse.json(imageFiles);
  } catch (error) {
    console.error('Error reading directory:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 
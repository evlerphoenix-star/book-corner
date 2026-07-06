import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const pdfFile = data.get('pdf') as File;
    const coverFile = data.get('cover') as File;
    const title = data.get('title') as string;

    if (!pdfFile || !coverFile || !title) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const cleanTitle = title.toLowerCase().replace(/\s+/g, '-');
    
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
    const coverBuffer = Buffer.from(await coverFile.arrayBuffer());

    const pdfDir = path.join(process.cwd(), 'public/books');
    const coverDir = path.join(process.cwd(), 'public/covers');

    await mkdir(pdfDir, { recursive: true });
    await mkdir(coverDir, { recursive: true });

    await writeFile(path.join(pdfDir, `${cleanTitle}.pdf`), pdfBuffer);
    await writeFile(path.join(coverDir, `${cleanTitle}${path.extname(coverFile.name)}`), coverBuffer);

    return NextResponse.json({ 
      success: true, 
      message: `${title} successfully uploaded to the shelf.` 
    });

  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Server failed to save the files.' }, { status: 500 });
  }
}
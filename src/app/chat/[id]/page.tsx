'use client';

import { useEffect, useState } from 'react';
import { Chat } from '@/components/chat/chat';
import { useParams } from 'next/navigation'; // Use useParams instead of useRouter
import projects from './project.json'; // Adjust the path according to your directory structure

type Project = {
  id: string;
  projectname: string;
  indexname: string;
};

export default function ProtectedPage() {
  const { id } = useParams(); // Access the id parameter
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (id) {
      const currentProject = projects.find((proj) => proj.id === id);
      setProject(currentProject || null);
    }
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <Chat projectname={project.projectname} indexname={project.indexname} />
  );
}

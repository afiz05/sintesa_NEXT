"use client";

import { Card, CardBody, Avatar, Button } from "@heroui/react";

const teamMembers = [
  {
    name: "Moudy Hermawan",
    role: "Penanggung Jawab",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    linkedin: "#",
    github: "#",
    level: "director",
  },
  {
    name: "Arie Suwandani",
    role: "Pembina",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    linkedin: "#",
    github: "#",
    level: "management",
  },
  {
    name: "Bayu Yudistira",
    role: "Project Manager",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    linkedin: "#",
    github: "#",
    level: "management",
  },
  {
    name: "Yacob Yulis Setyoko",
    role: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
    linkedin: "#",
    github: "#",
    level: "developer",
  },
  {
    name: "Taufan M. Harits",
    role: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/31.jpg",
    linkedin: "#",
    github: "#",
    level: "developer",
  },
  {
    name: "Restu Alam Siagian",
    role: "Full Stack Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    linkedin: "#",
    github: "#",
    level: "developer",
  },
  {
    name: "Wirasukma Legendani",
    role: "UI/UX Designer",
    image: "https://randomuser.me/api/portraits/women/40.jpg",
    linkedin: "#",
    github: "#",
    level: "developer",
  },
];

export default function TentangKami() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-slate-100 dark:bg-black pt-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Tentang Tim Pengembang
      </h1>
      {/* <p className="text-gray-600 mb-8 text-center max-w-2xl">
        Seksi Pengelolaan Data dan Pengembangan Sistem Informasi Pelaksanaan
        Anggaran.
      </p> */}
      {/* Director */}
      <div className="mb-10 w-full flex flex-col items-center">
        {teamMembers
          .filter((m) => m.level === "director")
          .map((member, idx) => (
            <Card
              key={idx}
              className="flex flex-row items-center shadow-lg bg-white dark:bg-zinc-800 w-full max-w-xs min-h-0 h-32"
            >
              <Avatar
                src={member.image}
                size="lg"
                className="h-full w-auto aspect-square object-cover text-3xl rounded-none"
                style={{ height: "100%" }}
              />
              <CardBody className="flex flex-col items-center p-2">
                <h3 className="font-bold text-xl mb-1 text-zinc-800 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-zinc-600 dark:text-white mb-2 font-semibold">
                  {member.role}
                </p>
                <div className="flex gap-2">
                  <Button
                    as="a"
                    href={member.linkedin}
                    size="sm"
                    color="primary"
                    variant="light"
                    target="_blank"
                  >
                    LinkedIn
                  </Button>
                  <Button
                    as="a"
                    href={member.github}
                    size="sm"
                    color="secondary"
                    variant="light"
                    target="_blank"
                  >
                    GitHub
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>
      {/* Management */}
      <div className="mb-10 w-full flex flex-row justify-center gap-8 flex-wrap">
        {teamMembers
          .filter((m) => m.level === "management")
          .map((member, idx) => (
            <Card
              key={idx}
              className="flex flex-row items-center shadow-md bg-white dark:bg-zinc-800 w-full max-w-xs min-h-0 h-32"
            >
              <Avatar
                src={member.image}
                size="lg"
                className="h-full w-auto aspect-square object-cover text-3xl rounded-none"
                style={{ height: "100%" }}
              />
              <CardBody className="flex flex-col items-center p-2">
                <h3 className="font-semibold text-lg mb-1 text-zinc-800 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-zinc-600 dark:text-white mb-2 font-medium">
                  {member.role}
                </p>
                <div className="flex gap-2">
                  <Button
                    as="a"
                    href={member.linkedin}
                    size="sm"
                    color="primary"
                    variant="light"
                    target="_blank"
                  >
                    LinkedIn
                  </Button>
                  <Button
                    as="a"
                    href={member.github}
                    size="sm"
                    color="secondary"
                    variant="light"
                    target="_blank"
                  >
                    GitHub
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>
      {/* Developers & UI/UX */}
      <div className="w-full flex flex-row justify-center gap-8 flex-wrap px-8">
        {teamMembers
          .filter((m) => m.level === "developer")
          .map((member, idx) => (
            <Card
              key={idx}
              className="flex flex-row items-center shadow-lg bg-white dark:bg-zinc-800 w-full max-w-xs min-h-0 h-32"
            >
              <Avatar
                src={member.image}
                size="lg"
                className="h-full w-auto aspect-square object-cover text-3xl rounded-none"
                style={{ height: "100%" }}
              />
              <CardBody className="flex flex-col items-center p-2">
                <h3 className="font-semibold text-lg  text-zinc-800 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="font-medium text-zinc-600 dark:text-white mb-2">
                  {member.role}
                </p>
                <div className="flex gap-2">
                  <Button
                    as="a"
                    href={member.linkedin}
                    size="sm"
                    color="primary"
                    variant="light"
                    target="_blank"
                  >
                    LinkedIn
                  </Button>
                  <Button
                    as="a"
                    href={member.github}
                    size="sm"
                    color="secondary"
                    variant="light"
                    target="_blank"
                  >
                    GitHub
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  );
}

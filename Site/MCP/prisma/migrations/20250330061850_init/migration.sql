-- CreateTable
CREATE TABLE "MCP_Repo" (
    "id" SERIAL NOT NULL,
    "repo" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "star" INTEGER NOT NULL,
    "tags" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "update" DATE NOT NULL,
    "up" INTEGER NOT NULL DEFAULT 0,
    "label" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "MCP_Repo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MCP_RepoDetail" (
    "id" TEXT NOT NULL,
    "repoId" INTEGER NOT NULL,
    "view" INTEGER NOT NULL,
    "users" INTEGER NOT NULL,
    "version" TEXT NOT NULL,
    "update" DATE NOT NULL,

    CONSTRAINT "MCP_RepoDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MCP_Readme" (
    "id" TEXT NOT NULL,
    "repoId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "MCP_Readme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MCP_ReadmeImage" (
    "id" TEXT NOT NULL,
    "repoId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "readmeId" TEXT,

    CONSTRAINT "MCP_ReadmeImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MCP_Repo_repo_key" ON "MCP_Repo"("repo");

-- CreateIndex
CREATE UNIQUE INDEX "MCP_RepoDetail_repoId_key" ON "MCP_RepoDetail"("repoId");

-- CreateIndex
CREATE UNIQUE INDEX "MCP_Readme_repoId_key" ON "MCP_Readme"("repoId");

-- AddForeignKey
ALTER TABLE "MCP_RepoDetail" ADD CONSTRAINT "MCP_RepoDetail_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "MCP_Repo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCP_Readme" ADD CONSTRAINT "MCP_Readme_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "MCP_Repo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCP_ReadmeImage" ADD CONSTRAINT "MCP_ReadmeImage_repoId_fkey" FOREIGN KEY ("repoId") REFERENCES "MCP_Repo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCP_ReadmeImage" ADD CONSTRAINT "MCP_ReadmeImage_readmeId_fkey" FOREIGN KEY ("readmeId") REFERENCES "MCP_Readme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

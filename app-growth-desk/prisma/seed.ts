import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const ownerEmail = process.env.OWNER_EMAIL ?? "owner@example.com";
  await prisma.user.upsert({
    where: { email: ownerEmail },
    update: {},
    create: {
      email: ownerEmail,
      passwordHash: bcrypt.hashSync("changeme123", 10),
    },
  });

  const app = await prisma.app.upsert({
    where: { appStoreId: "1459896708" },
    update: {},
    create: {
      appStoreId: "1459896708",
      bundleId: "com.appgrowth.watereject",
      name: "Water Eject - Speaker Cleaner",
      developerName: "App Growth Labs",
      category: "Utilities",
      ratingAverage: 4.7,
      ratingCount: 18342,
      currentVersion: "3.4.1",
      isOwned: true,
    },
  });

  await prisma.appLocaleMetadata.upsert({
    where: { appId_localeCode: { appId: app.id, localeCode: "en-US" } },
    update: {},
    create: {
      appId: app.id,
      localeCode: "en-US",
      title: "Water Eject - Speaker Cleaner",
      subtitle: "Remove water from speaker fast",
      keywordsField: "water eject,speaker cleaner,remove water,clean speaker",
      promotionalText: "New sound wave patterns added for deeper cleaning power.",
      description: "Water Eject helps you clear water trapped in your phone's speaker...",
    },
  });

  await prisma.keyword.upsert({
    where: { appId_term_countryCode: { appId: app.id, term: "speaker cleaner", countryCode: "US" } },
    update: {},
    create: {
      appId: app.id,
      term: "speaker cleaner",
      countryCode: "US",
      localeCode: "en-US",
      intent: "HIGH_INTENT",
      cluster: "Tool keywords",
      bestRank: 2,
      status: "FALLING",
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

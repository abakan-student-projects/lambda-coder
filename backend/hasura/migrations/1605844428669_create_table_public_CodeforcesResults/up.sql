CREATE TABLE "public"."CodeforcesResults"("id" serial NOT NULL, "contestId" integer NOT NULL, "contestName" text NOT NULL, "rank" text NOT NULL, "oldRating" integer NOT NULL, "newRating" integer NOT NULL, "contestantsCount" integer NOT NULL, "date" timestamptz NOT NULL, PRIMARY KEY ("id") );

create index codeforcesresults_date_index
	on "CodeforcesResults" (date);
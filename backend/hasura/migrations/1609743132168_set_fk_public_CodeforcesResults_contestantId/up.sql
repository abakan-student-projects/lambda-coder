alter table "public"."CodeforcesResults"
           add constraint "CodeforcesResults_contestantId_fkey"
           foreign key ("contestantId")
           references "public"."Contestants"
           ("id") on update set null on delete set null;

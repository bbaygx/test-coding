import { checkListAll, checkListPost } from "@/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { queryClient } from "@/lib/lib";

export function CheckList() {
  const [value, setValue] = useState("");

  const checkList = useQuery({
    queryKey: ["checklist"],
    queryFn: checkListAll,
  });

  const postList = useMutation({
    mutationFn: checkListPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["checklist"] });
    },
  });

  const handleSubmit = () => {
    postList.mutate(value);
  };

  return (
    <div>
      <div className="" id="getChecklist">
        {checkList.isLoading && <span>Loading Checklist...</span>}
        {checkList.isSuccess && <div>{JSON.stringify(checkList.data)}</div>}
      </div>
      <div className="max-w-72">
        <h1>Create Name</h1>
        <Input placeholder="name" onChange={(e) => setValue(e.target.value)} />
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
}

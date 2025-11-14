"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { toast } from "sonner";
import z from "zod";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

const StartupForm = () => {
  const [error, setError] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const router = useRouter();
  const handleSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        category: formData.get("category") as string,
        description: formData.get("description") as string,
        link: formData.get("link") as string,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);
      if (result.status == "SUCCESS") {
        toast("Success", {
          description: "Your Startup Pitch has been submitted successfully",
        });
        router.push(`/startup/${result._id}`);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setError(fieldErrors as Record<string, string>);

        toast("Error", {
          description: "PLease Check your inputs and try again",
        });

        return { ...prevState, error: "Validation Failed", status: "ERROR" };
      }

      toast("Error", {
        description: "Something Unexpected Happened",
      });
      return {
        ...prevState,
        error: "Something Unexpected Happened",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isSubmitting] = useActionState(handleSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          name="title"
          id="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />
        {error.title && <p className="startup-form_error">{error.title}</p>}
      </div>
      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          name="description"
          id="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />
        {error.description && (
          <p className="startup-form_error">{error.description}</p>
        )}
      </div>
      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          name="category"
          id="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Eduation)"
        />
        {error.category && (
          <p className="startup-form_error">{error.category}</p>
        )}
      </div>
      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>
        <Input
          name="link"
          id="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />
        {error.link && <p className="startup-form_error">{error.link}</p>}
      </div>
      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>
        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden" }}
          textareaProps={{
            placeholder:
              "Briefly Describe Your Startup And The Problem It Solves",
          }}
          previewOptions={{ disallowedElements: ["style"] }}
        />
        {error.pitch && <p className="startup-form_error">{error.pitch}</p>}
      </div>
      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Your Idea"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;

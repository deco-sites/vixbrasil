import {
  DepartmentImages,
  DepartmentImagesProps,
} from "../../components/departmentImages/index.tsx";
import Section from "../../components/ui/Section.tsx";

export const LoadingFallback = () => <Section.Placeholder height="620px" />;

export default function DepartmentImagesComponent(
  { items }: DepartmentImagesProps,
) {
  return (
    <Section.Container>
      <DepartmentImages items={items} />
    </Section.Container>
  );
}

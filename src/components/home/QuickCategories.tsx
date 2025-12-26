import { Link } from "react-router-dom";

const quickCategories = [
  { name: "Smartphones", slug: "smartphones" },
  { name: "Informatique", slug: "informatique" },
  { name: "Cuisine", slug: "cuisine" },
];

const QuickCategories = () => {
  return (
    <section className="py-6">
      <div className="flex flex-wrap justify-center gap-3">
        {quickCategories.map((category) => (
          <Link
            key={category.slug}
            to={`/boutique?category=${category.slug}`}
            className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuickCategories;

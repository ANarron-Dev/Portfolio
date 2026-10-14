
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(
    ".filter-btn"
  );

  const portfolioItems = document.querySelectorAll(
    ".portfolio-item"
  );

  const emptyMessage = document.getElementById(
    "portfolio-empty"
  );

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter;
      let visibleCount = 0;

      // Update active filter button
      filterButtons.forEach((btn) => {
        const isActive = btn === button;

        btn.classList.toggle("active", isActive);
        btn.setAttribute("aria-pressed", String(isActive));
      });

      // Show or hide matching projects
      portfolioItems.forEach((item) => {
        const matches =
          selectedCategory === "all" ||
          item.dataset.category.split(" ").includes(selectedCategory);

        item.hidden = !matches;

        if (matches) visibleCount++;
      });

      // Display message for empty categories
      if (emptyMessage) {
        emptyMessage.hidden = visibleCount > 0;
      }
    });
  });
});

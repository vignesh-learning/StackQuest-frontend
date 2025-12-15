import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import "./graphQL.css"; // you can rename this later to django.css if needed

// ---------------- Questions ----------------
const djangoQuestions = [
  {
    type: "checkbox",
    question: "Which of the following are features of Django?",
    options: [
      { text: "Follows MVT (Model-View-Template) architecture", correct: true },
      { text: "Has a built-in admin interface", correct: true },
      { text: "Requires writing SQL queries manually for every operation", correct: false },
      { text: "Provides built-in authentication system", correct: true },
    ],
  },
  {
    type: "checkbox",
    question: "Which files are typically found in a Django app?",
    options: [
      { text: "views.py", correct: true },
      { text: "models.py", correct: true },
      { text: "templates/", correct: true },
      { text: "server.js", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which of the following are features of Django?",
    options: [
      { text: "MTV architecture", correct: true },
      { text: "ORM system", correct: true },
      { text: "Built-in admin panel", correct: true },
      { text: "Requires PHP to run", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which of these are Django project files?",
    options: [
      { text: "manage.py", correct: true },
      { text: "settings.py", correct: true },
      { text: "urls.py", correct: true },
      { text: "app.js", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which databases does Django support officially?",
    options: [
      { text: "SQLite", correct: true },
      { text: "PostgreSQL", correct: true },
      { text: "MySQL", correct: true },
      { text: "MongoDB (natively)", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are Django template features?",
    options: [
      { text: "Template inheritance", correct: true },
      { text: "Filters and Tags", correct: true },
      { text: "Raw Python execution inside template", correct: false },
      { text: "Rendering context data", correct: true },
    ],
  },
  {
    type: "checkbox",
    question: "Which files are usually found in a Django app?",
    options: [
      { text: "models.py", correct: true },
      { text: "views.py", correct: true },
      { text: "admin.py", correct: true },
      { text: "index.html", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which of these are Django field types?",
    options: [
      { text: "CharField", correct: true },
      { text: "TextField", correct: true },
      { text: "IntegerField", correct: true },
      { text: "CSVField", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which of these are valid Django relationships?",
    options: [
      { text: "OneToOneField", correct: true },
      { text: "ForeignKey", correct: true },
      { text: "ManyToManyField", correct: true },
      { text: "RelationField", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which of these are valid Django migration commands?",
    options: [
      { text: "python manage.py makemigrations", correct: true },
      { text: "python manage.py migrate", correct: true },
      { text: "python manage.py sqlmigrate", correct: true },
      { text: "python manage.py dbupdate", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are valid HTTP methods supported by Django views?",
    options: [
      { text: "GET", correct: true },
      { text: "POST", correct: true },
      { text: "DELETE", correct: true },
      { text: "PUSH", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are true about Django middleware?",
    options: [
      { text: "Executes on every request", correct: true },
      { text: "Can modify request and response", correct: true },
      { text: "Defined in settings.py", correct: true },
      { text: "Runs only on static files", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which of these are Django context processors?",
    options: [
      { text: "request", correct: true },
      { text: "auth", correct: true },
      { text: "static", correct: true },
      { text: "middleware", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are true about Django admin?",
    options: [
      { text: "Provides CRUD for models", correct: true },
      { text: "Requires registering models", correct: true },
      { text: "Only superusers can access it", correct: true },
      { text: "It cannot be customized", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are true about Django sessions?",
    options: [
      { text: "Can store data in database", correct: true },
      { text: "Can use cache backend", correct: true },
      { text: "Can store sessions in files", correct: true },
      { text: "Only works with PostgreSQL", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are static file settings in Django?",
    options: [
      { text: "STATIC_URL", correct: true },
      { text: "STATICFILES_DIRS", correct: true },
      { text: "STATIC_ROOT", correct: true },
      { text: "STATIC_CONFIG", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are Django caching backends?",
    options: [
      { text: "Memcached", correct: true },
      { text: "Redis", correct: true },
      { text: "File-based cache", correct: true },
      { text: "CSV cache", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are Django built-in form fields?",
    options: [
      { text: "CharField", correct: true },
      { text: "EmailField", correct: true },
      { text: "BooleanField", correct: true },
      { text: "JsonField", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which of these are valid model query methods?",
    options: [
      { text: "all()", correct: true },
      { text: "filter()", correct: true },
      { text: "get()", correct: true },
      { text: "find()", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which of these are features of Django ORM?",
    options: [
      { text: "SQL abstraction", correct: true },
      { text: "Lazy evaluation", correct: true },
      { text: "Query chaining", correct: true },
      { text: "Direct raw SQL only", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which of these are valid Django signals?",
    options: [
      { text: "pre_save", correct: true },
      { text: "post_save", correct: true },
      { text: "pre_delete", correct: true },
      { text: "on_change", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are advantages of Django?",
    options: [
      { text: "Rapid development", correct: true },
      { text: "Security features built-in", correct: true },
      { text: "Scalable and reusable apps", correct: true },
      { text: "Runs only on Windows", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which authentication features does Django provide?",
    options: [
      { text: "Login & Logout views", correct: true },
      { text: "Password hashing", correct: true },
      { text: "Permissions & Groups", correct: true },
      { text: "OAuth2 built-in", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which files are part of Django settings?",
    options: [
      { text: "DEBUG", correct: true },
      { text: "INSTALLED_APPS", correct: true },
      { text: "DATABASES", correct: true },
      { text: "CONFIG_JSON", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are Django’s generic views?",
    options: [
      { text: "ListView", correct: true },
      { text: "DetailView", correct: true },
      { text: "CreateView", correct: true },
      { text: "RunView", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are Django template tags?",
    options: [
      { text: "{% for %}", correct: true },
      { text: "{% if %}", correct: true },
      { text: "{% include %}", correct: true },
      { text: "{% execute %}", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are settings for Django internationalization (i18n)?",
    options: [
      { text: "LANGUAGE_CODE", correct: true },
      { text: "USE_I18N", correct: true },
      { text: "TIME_ZONE", correct: true },
      { text: "MULTI_LANG", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are Django password validators?",
    options: [
      { text: "UserAttributeSimilarityValidator", correct: true },
      { text: "MinimumLengthValidator", correct: true },
      { text: "CommonPasswordValidator", correct: true },
      { text: "RegexPasswordValidator", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which are true about Django REST Framework (DRF)?",
    options: [
      { text: "Provides API views", correct: true },
      { text: "Supports serialization", correct: true },
      { text: "Built into Django by default", correct: false },
      { text: "Supports authentication", correct: true },
    ],
  },
  {
    type: "checkbox",
    question: "Which are valid Django logging handlers?",
    options: [
      { text: "FileHandler", correct: true },
      { text: "StreamHandler", correct: true },
      { text: "SMTPHandler", correct: true },
      { text: "CSSHandler", correct: false },
    ],
  },
  {
    type: "checkbox",
    question: "Which of these are settings for Django email?",
    options: [
      { text: "EMAIL_HOST", correct: true },
      { text: "EMAIL_PORT", correct: true },
      { text: "EMAIL_HOST_USER", correct: true },
      { text: "EMAIL_SERVER_PATH", correct: false },
    ],
  },
  {
    type: "code",
    question: "Write a simple Django view that returns 'Hello, Django!' when a user visits the page.",
    expectedAnswer: `from django.http import HttpResponse

def hello(request):
    return HttpResponse("Hello, Django!")`,
    starterCode: `# write a view function here`,
  },
  {
    type: "checkbox",
    question: "Which of the following are true about Django models?",
    options: [
      { text: "They define the structure of database tables", correct: true },
      { text: "They are written as Python classes", correct: true },
      { text: "They automatically generate SQL queries", correct: true },
      { text: "They can only work with MySQL", correct: false },
    ],
  },
   {
    type: "code",
    question: "Write the command to start a new Django project called `mywebsite`.",
    expectedAnswer: `django-admin startproject mywebsite`,
    starterCode: `# write command here`,
  },
  {
    type: "code",
    question: "Start a new Django project named `myproject`.",
    expectedAnswer: `django-admin startproject myproject`,
    starterCode: `# command here`,
  },
  {
    type: "code",
    question: "Create a new Django app named `blog`.",
    expectedAnswer: `python manage.py startapp blog`,
    starterCode: `# command here`,
  },
  {
    type: "code",
    question: "Run the development server on port 9000.",
    expectedAnswer: `python manage.py runserver 9000`,
    starterCode: `# command here`,
  },
  {
    type: "code",
    question: "Create a model `Author` with fields name (CharField) and email (EmailField).",
    expectedAnswer: `from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()`,
    starterCode: `# write model here`,
  },
  {
    type: "code",
    question: "Write a view that returns 'Welcome to Django'.",
    expectedAnswer: `from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to Django")`,
    starterCode: `# write view here`,
  },
  {
    type: "code",
    question: "Map '/home/' URL to the `home` view.",
    expectedAnswer: `from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home, name='home'),
]`,
    starterCode: `# write urls here`,
  },
  {
    type: "code",
    question: "Run migrations in Django.",
    expectedAnswer: `python manage.py migrate`,
    starterCode: `# command here`,
  },
  {
    type: "code",
    question: "Make migrations in Django.",
    expectedAnswer: `python manage.py makemigrations`,
    starterCode: `# command here`,
  },
  {
    type: "code",
    question: "Create a superuser in Django.",
    expectedAnswer: `python manage.py createsuperuser`,
    starterCode: `# command here`,
  },
  {
    type: "code",
    question: "Write ORM query to fetch all objects from Post model.",
    expectedAnswer: `Post.objects.all()`,
    starterCode: `# query here`,
  },
  {
    type: "code",
    question: "Write ORM query to filter users with is_staff=True.",
    expectedAnswer: `User.objects.filter(is_staff=True)`,
    starterCode: `# query here`,
  },
  {
    type: "code",
    question: "Write ORM query to get a single object with id=10 from Product model.",
    expectedAnswer: `Product.objects.get(id=10)`,
    starterCode: `# query here`,
  },
  {
    type: "code",
    question: "Write ORM query to delete a Comment with id=3.",
    expectedAnswer: `Comment.objects.get(id=3).delete()`,
    starterCode: `# query here`,
  },
  {
    type: "code",
    question: "Create a Django form with 'username' (CharField) and 'email' (EmailField).",
    expectedAnswer: `from django import forms

class UserForm(forms.Form):
    username = forms.CharField(max_length=100)
    email = forms.EmailField()`,
    starterCode: `# write form here`,
  },
  {
    type: "code",
    question: "Write a class-based ListView for Post model.",
    expectedAnswer: `from django.views.generic import ListView
from .models import Post

class PostListView(ListView):
    model = Post`,
    starterCode: `# CBV here`,
  },
  {
    type: "code",
    question: "Collect static files in Django.",
    expectedAnswer: `python manage.py collectstatic`,
    starterCode: `# command here`,
  },
  {
    type: "code",
    question: "Write ORM query to order books by published_date descending.",
    expectedAnswer: `Book.objects.order_by('-published_date')`,
    starterCode: `# query here`,
  },
  {
    type: "code",
    question: "Write a custom manager that filters active users.",
    expectedAnswer: `from django.db import models

class ActiveUserManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)`,
    starterCode: `# write manager here`,
  },
  {
    type: "code",
    question: "Write ORM query to count total users.",
    expectedAnswer: `User.objects.count()`,
    starterCode: `# query here`,
  },
  {
    type: "code",
    question: "Write ORM query to get distinct categories from Product model.",
    expectedAnswer: `Product.objects.values('category').distinct()`,
    starterCode: `# query here`,
  },
  {
    type: "code",
    question: "Write a Django model for a `Post` with `title` (CharField) and `content` (TextField).",
    expectedAnswer: `from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()`,
    starterCode: `# write your Post model here`,
  },
];


// ---------------- Component ----------------
function Django() {
  const [theme, setTheme] = useState("dark-mode");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [code, setCode] = useState("");

  const totalQuestions =  djangoQuestions.length;
  const currentQuestion = djangoQuestions[currentIndex];

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark-mode" ? "light-mode" : "dark-mode"));
  };

    useEffect(() => {
      document.body.classList.remove("light-mode", "dark-mode");
      document.body.classList.add(theme);
    }, [theme]);

  useEffect(() => {
    setSelectedOptions([]);
    setFeedback("");
    setCode(currentQuestion.starterCode || "");

    const progress = Math.floor(((currentIndex + 1) / totalQuestions) * 100);
    localStorage.setItem("course_django_progress", progress);
  }, [currentIndex, totalQuestions, currentQuestion.starterCode]);

  const validateCheckboxAnswer = () => {
    const correctOptions = currentQuestion.options
      .map((opt, i) => (opt.correct ? i : null))
      .filter((val) => val !== null);

    const isCorrect =
      correctOptions.length === selectedOptions.length &&
      correctOptions.every((val) => selectedOptions.includes(val));

    setFeedback(isCorrect ? "✅ Correct Answer!" : "❌ Incorrect. Try again.");
  };

  const validateCodeAnswer = () => {
    const user = code.trim().replace(/\s+/g, "");
    const expected = currentQuestion.expectedAnswer.trim().replace(/\s+/g, "");
    setFeedback(user === expected ? "✅ Correct Answer!" : "❌ Incorrect. Try again.");
  };

  const handleNext = () => {
    if (currentIndex < djangoQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      localStorage.setItem("course_django_completed", "true");
      localStorage.setItem("course_django_progress", "100");

      alert("🎉 Congratulations! You completed the JavaScript course!");

      window.location.href = "/complete";
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className={theme} style={{ padding: "20px", fontFamily: "Times new roman" }}>
      <header className="main-header" style={{ marginBottom: "20px" }}>
        <div className="header-left">
          <a href="/account"><i className="fa-regular fa-user"></i> Account</a>
        </div>
        <div className="header-right">
          <nav>
            <a href="/home">Home</a>
            <a href="/practice">Practice</a>
            <a href="/CourseProgress">Complete</a>
            <a href="/about">About</a>
          </nav>
          <button className="theme-toggle" onClick={toggleTheme}>
            <i className={`fa-solid ${theme === "dark-mode" ? "fa-sun" : "fa-moon"}`}></i>
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="quiz-container">
          <div className="left-side">
            <div className="question-text">{currentQuestion.question}</div>
            <div
              style={{ margin: "10px 0", color: "green", fontWeight: "bold" }}
            >
              Progress:{" "}
              {Math.floor(((currentIndex + 1) / totalQuestions) * 100)}%
            </div>

            <div id="feedback">{feedback}</div>
            <div className="navigation">
              <button onClick={handlePrevious}>Previous</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>

          <div className="right-side">
            {currentQuestion.type === "checkbox" ? (
              <div id="checkboxOptions">
                <div className="option-instruction">Pick the correct options:</div>
                {currentQuestion.options.map((opt, i) => (
                  <label key={i}>
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(i)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setSelectedOptions((prev) =>
                          checked ? [...prev, i] : prev.filter((idx) => idx !== i)
                        );
                      }}
                    />
                    {" " + opt.text}
                  </label>
                ))}
                <button onClick={validateCheckboxAnswer}>Submit Answer</button>
              </div>
            ) : (
              <div id="codeEditorContainer">
                <CodeMirror
                  value={code}
                  height="200px"
                  extensions={[javascript()]}
                  theme={oneDark}
                  onChange={(value) => setCode(value)}
                />
                <button onClick={validateCodeAnswer}>Submit Code</button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Django;

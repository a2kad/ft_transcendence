// Minimal SPA router for vanilla TypeScript
export type Route = {
  path: string;
  render: () => void;
};

class Router {
  private routes: Route[] = [];
  private root: string;

  constructor(root: string = '/') {
    this.root = root;
    window.addEventListener('popstate', () => this.resolve());
  }

  add(path: string, render: () => void) {
    this.routes.push({ path, render });
  }

  navigate(path: string) {
    history.pushState({}, '', this.root + path);
    this.resolve();
  }

  resolve() {
    const path = location.pathname.replace(this.root, '') || '/';
    const route = this.routes.find(r => r.path === path);
    if (route) {
      route.render();
    } else {
      this.renderNotFound();
    }
  }

  renderNotFound() {
    const app = document.getElementById('app');
    if (app) app.innerHTML = '<h2 class="text-red-600">Page Not Found</h2>';
  }
}

export const router = new Router('/');

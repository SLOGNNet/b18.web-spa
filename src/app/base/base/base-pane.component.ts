import { Router, ActivatedRoute } from '@angular/router';

export abstract class BasePane {

  constructor(protected router: Router, protected route: ActivatedRoute) {
  };

  rediretToId(id: number) {
    const urlTree = this.router.parseUrl(this.router.url);
    const idSegment = urlTree.root.children['primary'].segments[1];
    if (idSegment) {
      // todo find better approach to change id parameter
      idSegment.path = id.toString();
      this.resetSubChildIfNeed(urlTree);
      this.router.navigateByUrl(urlTree, { preserveFragment: true });
    }
    else {
      this.router.navigate([id], { preserveQueryParams: true, relativeTo: this.route });
    }
  }

  resetSubChildIfNeed(urlTree) {
    const subChildSegment = urlTree.root.children['primary'].segments[2];
    const subChildIdSegment = urlTree.root.children['primary'].segments[3];

    if (subChildSegment.path.includes('edit') && subChildIdSegment) {
      subChildIdSegment.path = '0';
    }
  }
}

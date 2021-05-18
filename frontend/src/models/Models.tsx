export interface Image {
    key: number,            // 0
    created: string,        // "6 weeks ago"
    id: string,             // "6678c7c2e56c"
    repository: string,     // "docker.io/library/nginx"
    size: string,           // "131 MB"
    tag: string             // "1.17.10-alpine-perl"
}

export interface Container {
    key: number,            // 0
    containerId: string,    // "5ae4a214e530"
    image: string,          // "registry.fedoraproject.org/f29/httpd:latest"
    command: string,        // "/usr/bin/run-http..."
    created: string,        // "4 minutes ago"
    ports: string,          // "0.0.0.0:8080->8080/tcp"
    names: string,          // "cool_kalam"
    status: string,         // "Running"
}

export interface Volume {
    Anonymous: boolean,     // false
    CreatedAt: string,      // "2020-12-14T11:56:14.6300363+01:00"
    Driver: string,         // "local"
    GID: number,            // 0
    Labels: Object,         // {}
    Mountpoint: string,     // "/home/thesis/.local/share/containers/storage/volumes/my-vol-1/_data"
    Name: string,           // "my-vol-1"
    Options: Object,        // {}
    Scope: string,          // "local"
    UID: number,            // 0
}

export interface Connection {
    username: string,
    ip: string,
    podmanSocketPath: string,
}

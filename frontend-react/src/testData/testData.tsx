export const imagesDataTest = [
    {
        "key": 0,
        "created": "6 weeks ago",
        "id": "6678c7c2e56c",
        "repository": "docker.io/library/nginx",
        "size": "131 MB",
        "tag": "1.17.10-alpine-perl"
    },
    {
        "key": 1,
        "created": "3 months ago",
        "id": "e7d92cdc71fe",
        "repository": "docker.io/library/alpine",
        "size": "5.86 MB",
        "tag": "latest"
    }
];

export const containersDataTest = [
    {
        key: 0,
        containerId: "5ae4a214e530",
        image: "registry.fedoraproject.org/f29/httpd:latest",
        command: "/usr/bin/run-http...",
        created: "4 minutes ago",
        ports: "0.0.0.0:8080->8080/tcp",
        names: "cool_kalam"
    },
    {
        key: 1,
        containerId: "1235ae4a214e530123",
        image: "second.fedoraproject.org/second",
        command: "test/test/usr/bin/run-http...",
        created: "21 minutes ago",
        ports: "1.1.1.1:8080->8080/tcp",
        names: "test_name"
    },
];

export const volumesDataTest = [
    {
        Anonymous: false,
        CreatedAt: "2020-12-14T11:56:14.6300363+01:00",
        Driver: "local",
        GID: 0,
        Labels: {},
        Mountpoint: "/home/thesis/.local/share/containers/storage/volumes/my-vol-1/_data",
        Name: "my-vol-1",
        Options: {},
        Scope: "local",
        UID: 0
    },
    {
        Anonymous: false,
        CreatedAt: "2020-12-14T11:56:20.1633446+01:00",
        Driver: "local",
        GID: 0,
        Labels: {},
        Mountpoint: "/home/thesis/.local/share/containers/storage/volumes/my-vol-2/_data",
        Name: "my-vol-2",
        Options: {},
        Scope: "local",
        UID: 0
    },
];

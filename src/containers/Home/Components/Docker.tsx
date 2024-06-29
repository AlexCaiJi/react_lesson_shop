import { DockersType } from "../types";

type DockerTypePropsType = {
  dockers: DockersType;
  onClick: (id: string) => void;
  selectId: string;
};

const Docker = (props: DockerTypePropsType) => {
  const { dockers, selectId } = props;
  const { onClick } = props;
  return (
    <div className="docker">
      {dockers.map((item) => {
        return (
          <div
            className="docker-item"
            key={item.id}
            onClick={() => {
              onClick(item.id);
            }}
          >
            <p
              className={`iconfont docker-item-icon ${
                selectId === item.id ? "docker-item-active" : ""
              }`}
              dangerouslySetInnerHTML={{ __html: item.icon }}
            ></p>
            <p
              className={`docker-item-title ${
                selectId === item.id ? "docker-item-active" : ""
              }`}
            >
              {item.name}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Docker;
